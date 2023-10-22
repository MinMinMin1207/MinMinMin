import express from "express";
import { requireRole } from "../middlewares/auth.js";
import Order from "../models/Order.js";
import ProductOrder from "../models/ProductOrder.js";
import User from "../models/User.js";

import {
  MessageResponse,
  DataResponse,
  Response,
  InternalErrorResponse,
  NotFoundResponse,
  ErrorResponse,
  UnAuthorizedResponse,
} from "../common/reponses.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const orders = await Order.findAll();
  res.json(DataResponse(orders));
});

router.get("/", requireRole("US"), async (req, res) => {
  const userId = res.locals.userData.id;

  const orders = await Order.findAll({
    where: {
      customerId: userId,
    },
    include: {
      model: ProductOrder,
      include: Product,
    },
  });

  if (orders == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(orders));
  }
});

router.post("/", requireRole("US"), async (req, res) => {
  const orderData = req.body;
  const userId = res.locals.userData.id;

  console.log(orderData.Note, orderData.deliveryId);

  try {
    const order = await Order.create({
      deliveryId: orderData.deliveryId,
      userId: userId,
      note: orderData.Note,
      paymentMethod: orderData.paymentMethod,
    });

    orderData.products.forEach(async (product) => {
      await ProductOrder.create({
        productId: product.productId,
        quantity: product.quantity,
        orderId: order.id,
      });
    });

    res.json(
      DataResponse({
        orderId: order.id,
      })
    );
  } catch (err) {
    console.log(err);
    res.json(InternalErrorResponse());
  }
});

router.delete("/:id", requireRole("AD"), async (req, res, next) => {
  const id = parseInt(req.params.id);

  try {
    const result = await Product.destroy({
      where: {
        id: id,
      },
    });

    if (result === 0) {
      res.json(NotFoundResponse());
    } else {
      res.json(MessageResponse("Order deleted successfully!"));
    }
  } catch (err) {
    console.log(err);
    res.json(InternalErrorResponse());
  }
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const orderData = req.body;

  const result = await Product.update(orderData, {
    where: {
      id: id,
    },
  });

  if (result[0] === 0) {
    res.json(NotFoundResponse());
  } else {
    res.json(MessageResponse("Order updated successfully"));
  }
});

export default router;
