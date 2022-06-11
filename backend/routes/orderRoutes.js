import express from "express";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getAllOrders,
} from "../controllers/orderController.js";
import isAdmin from "../middleware/adminMiddleware.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();
//routes should be sorted from less specific at the top to more specific at the bottom
router
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, isAdmin, getAllOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/delivered").put(protect, isAdmin, updateOrderToDelivered);
export default router;
