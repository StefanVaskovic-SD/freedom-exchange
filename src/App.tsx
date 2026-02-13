import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AccountProvider } from "./contexts/AccountContext";
import Index from "./pages/Index";
import Transactions from "./pages/Transactions";
import PensionWarning from "./pages/PensionWarning";
import MoveFunds from "./pages/MoveFunds";
import ReviewTransfer from "./pages/ReviewTransfer";
import SavingsWarning from "./pages/SavingsWarning";
import PinConfirmation from "./pages/PinConfirmation";
import TransferConfirmed from "./pages/TransferConfirmed";
import NotFound from "./pages/NotFound";
import AccountDetail from "./pages/AccountDetail";
import Learn from "./pages/Learn";
import LearnArticle from "./pages/LearnArticle";
import Budgeting from "./pages/Budgeting";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
			<TooltipProvider>
				<AccountProvider>
					<Toaster />
					<Sonner />
					<BrowserRouter>
						<ScrollToTop />
						<Routes>
							<Route path="/" element={<Index />} />
							<Route path="/transactions" element={<Transactions />} />
							<Route path="/pension-warning" element={<PensionWarning />} />
							<Route path="/move-funds" element={<MoveFunds />} />
							<Route path="/review-transfer" element={<ReviewTransfer />} />
							<Route path="/savings-warning" element={<SavingsWarning />} />
							<Route path="/pin-confirmation" element={<PinConfirmation />} />
							<Route
								path="/transfer-confirmed"
								element={<TransferConfirmed />}
							/>
							<Route path="/account/:id" element={<AccountDetail />} />
							<Route path="/learn" element={<Learn />} />
							<Route path="/learn/:id" element={<LearnArticle />} />
							<Route path="/budgeting" element={<Budgeting />} />
							{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
							<Route path="*" element={<NotFound />} />
						</Routes>
					</BrowserRouter>
				</AccountProvider>
			</TooltipProvider>
		</ThemeProvider>
	</QueryClientProvider>
);

export default App;
