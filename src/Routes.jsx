import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import LoginRegister from "pages/login-register";
import ShoppingCartCheckout from "pages/shopping-cart-checkout";
import MyTicketsQrCodes from "pages/my-tickets-qr-codes";
import EventDiscoveryDashboard from "pages/event-discovery-dashboard";
import EventDetailsBooking from "pages/event-details-booking";
import AdminControlPanel from "pages/admin-control-panel";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<EventDiscoveryDashboard />} />
        <Route path="/login-register" element={<LoginRegister />} />
        <Route path="/shopping-cart-checkout" element={<ShoppingCartCheckout />} />
        <Route path="/my-tickets-qr-codes" element={<MyTicketsQrCodes />} />
        <Route path="/event-discovery-dashboard" element={<EventDiscoveryDashboard />} />
        <Route path="/event-details-booking" element={<EventDetailsBooking />} />
        <Route path="/admin-control-panel" element={<AdminControlPanel />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;