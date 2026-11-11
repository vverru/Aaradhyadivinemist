import { NextRequest, NextResponse } from 'next/server';
import { getProductById, getCouponByCode, createOrder, getStoreSettings } from '@/lib/db';
import { Order, OrderItem, PaymentMethod, OrderStatus, PaymentStatus } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customer, shippingAddress, items, couponCode, shippingMethod, paymentMethod } = body;

    if (!customer?.fullName || !customer?.email || !customer?.phone) {
      return NextResponse.json(
        { success: false, message: 'Devotee contact details are required.' },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Basket cannot be empty.' },
        { status: 400 }
      );
    }

    // SERVER-SIDE PRICE VALIDATION (Never trust client prices!)
    let validatedSubtotal = 0;
    const validatedItems: OrderItem[] = [];

    for (const item of items) {
      const product = getProductById(item.productId);
      if (!product) {
        return NextResponse.json(
          { success: false, message: `Product ${item.productId} not found in catalog.` },
          { status: 400 }
        );
      }

      const qty = Math.max(1, parseInt(item.quantity) || 1);
      const itemSubtotal = product.price * qty;
      validatedSubtotal += itemSubtotal;

      validatedItems.push({
        productId: product.id,
        productName: product.name,
        packSize: item.packSize || product.packSize,
        price: product.price,
        mrp: product.mrp,
        quantity: qty,
        image: product.images[0] || '/images/products/sandalwood.png',
        subtotal: itemSubtotal,
      });
    }

    // Shipping Fee calculation
    const settings = getStoreSettings();
    let shippingFee = 0;
    if (shippingMethod === 'express') {
      shippingFee = settings.expressShippingFee || 120;
    } else {
      shippingFee = validatedSubtotal >= settings.freeShippingThreshold ? 0 : settings.standardShippingFee || 60;
    }

    // Server-side Coupon validation
    let discount = 0;
    let validatedCouponCode: string | undefined = undefined;

    if (couponCode) {
      const coupon = getCouponByCode(couponCode);
      if (coupon && validatedSubtotal >= coupon.minOrderValue) {
        validatedCouponCode = coupon.code;
        if (coupon.discountType === 'percentage') {
          discount = (validatedSubtotal * coupon.discountValue) / 100;
          if (coupon.maxDiscount && discount > coupon.maxDiscount) {
            discount = coupon.maxDiscount;
          }
        } else {
          discount = coupon.discountValue;
        }
      }
    }

    const grandTotal = Math.max(0, validatedSubtotal - discount + shippingFee);

    // Create unique order number
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `ADM-${new Date().getFullYear()}-${randomDigits}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customerName: customer.fullName,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      shippingAddress: {
        fullName: shippingAddress.fullName || customer.fullName,
        email: customer.email,
        phone: customer.phone,
        houseFlat: shippingAddress.houseFlat,
        street: shippingAddress.street,
        area: shippingAddress.area || '',
        city: shippingAddress.city,
        state: shippingAddress.state,
        pincode: shippingAddress.pincode,
        isDefault: true,
      },
      items: validatedItems,
      subtotal: validatedSubtotal,
      discount,
      couponCode: validatedCouponCode,
      shippingFee,
      tax: Math.round((validatedSubtotal * 18) / 118), // Included 18% GST
      grandTotal,
      status: 'confirmed' as OrderStatus,
      paymentStatus: (paymentMethod === 'cod' ? 'pending' : 'paid') as PaymentStatus,
      paymentMethod: (paymentMethod || 'razorpay') as PaymentMethod,
      razorpayOrderId: paymentMethod !== 'cod' ? `order_${Date.now()}` : undefined,
      shiprocketShipmentId: `SR${Math.floor(1000000 + Math.random() * 9000000)}`,
      courierName: 'Blue Dart Express',
      awbNumber: `BLUEDART${Math.floor(10000000 + Math.random() * 90000000)}`,
      trackingUrl: `https://track.aaradhyadivinemist.com?awb=BLUEDART${Math.floor(10000000 + Math.random() * 90000000)}`,
      notes: 'Order confirmed and scheduled for sacred packing.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const savedOrder = createOrder(newOrder);

    return NextResponse.json({
      success: true,
      order: savedOrder,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error processing checkout.' },
      { status: 500 }
    );
  }
}
