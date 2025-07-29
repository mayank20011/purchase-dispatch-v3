import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./Pages/Home";
import Purchase from "./Pages/Purchase/Purchase";
import Dispatch from "./Pages/Dispatch/Dispatch";
import Login from "./Pages/Login&Signup/Login";
import Signup from "./Pages/Login&Signup/Signup";
import SendOtp from "./Pages/Login&Signup/SendOtp";
import VerifyOTP from "./Pages/Login&Signup/VerifyOTP";
import ResetPassword from "./Pages/Login&Signup/ResetPassword";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PurchaseMilk from "./Pages/Purchase/PurchaseMilk";
import PurchaseSmp from "./Pages/Purchase/PurchaseSmp";
import PurchasePolyFilm from "./Pages/Purchase/PurchasePolyFilm";
import PurchaseWoodenBlock from "./Pages/Purchase/PurchaseWoodenBlock";
import PurchaseGensetDiesel from "./Pages/Purchase/PurchaseGensetDiesel";
import PurchaseDahiCup from "./Pages/Purchase/PurchaseDahiCup";
import PurchaseDahiMatka from "./Pages/Purchase/PurchaseDahiMatka";
import PageNotFound from "./Pages/PageNotFound";
import Creates from "./Pages/Creates/Creates";
const App = () => {
  const [isLogedIn, setIsLogedIn] = useState(localStorage.getItem("isLogedIn"));
  localStorage.setItem("isLogedIn", isLogedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home setIsLogedIn={setIsLogedIn} />} />
          <Route
            path="/purchase"
            element={<Purchase setIsLogedIn={setIsLogedIn} />}
          />
          <Route
            path="/purchase/milk"
            element={<PurchaseMilk setIsLogedIn={setIsLogedIn} />}
          />
          <Route
            path="/purchase/smp"
            element={<PurchaseSmp setIsLogedIn={setIsLogedIn} />}
          />
          <Route
            path="/purchase/polyfilm"
            element={<PurchasePolyFilm setIsLogedIn={setIsLogedIn} />}
          />
          <Route
            path="/purchase/wooden-block"
            element={<PurchaseWoodenBlock setIsLogedIn={setIsLogedIn} />}
          />
          <Route
            path="/purchase/diesel-genset"
            element={<PurchaseGensetDiesel setIsLogedIn={setIsLogedIn} />}
          />
          <Route
            path="/purchase/dahi-cup"
            element={<PurchaseDahiCup setIsLogedIn={setIsLogedIn} />}
          />
          <Route
            path="/purchase/dahi-matka"
            element={<PurchaseDahiMatka setIsLogedIn={setIsLogedIn} />}
          />
          <Route
            path="/dispatch"
            element={<Dispatch setIsLogedIn={setIsLogedIn} />}
          />
          <Route
            path="/creates"
            element={<Creates setIsLogedIn={setIsLogedIn} />}
          />
        </Route>
        <Route path="/login" element={<Login setIsLogedIn={setIsLogedIn} />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/Send-otp" element={<SendOtp />} />
        <Route path="/verify-otp/:email" element={<VerifyOTP />} />
        <Route path="/reset-password/:email" element={<ResetPassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
