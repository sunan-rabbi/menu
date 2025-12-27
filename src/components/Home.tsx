import Navbar from './Navbar';
import HeroSection from './HeroSection';
import Service from './Service';
import Footer from './Footer';

const LandingPage = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <HeroSection />
            <Service />
            <Footer />
        </div>
    );
};

export default LandingPage;