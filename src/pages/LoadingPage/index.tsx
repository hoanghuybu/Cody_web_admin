import { BarChart3, Settings, Shield, Users } from "lucide-react";
import { useEffect, useState } from "react";
function LoadingPage() {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const loadingSteps = [
    "Initializing system...",
    "Loading user data...",
    "Configuring dashboard...",
    "Finalizing setup...",
  ];
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 80);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % loadingSteps.length);
    }, 2000);

    return () => clearInterval(stepTimer);
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-6">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-30">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
            style={{ backgroundColor: "#465fff" }}
          ></div>
          <div
            className="absolute top-3/4 right-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"
            style={{ backgroundColor: "#465fff", opacity: 0.7 }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/2 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"
            style={{ backgroundColor: "#465fff", opacity: 0.5 }}
          ></div>
        </div>
      </div>

      {/* Main loading container */}
      <div className="relative z-10 bg-white/90 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-gray-200 max-w-md w-full">
        {/* Logo section */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg"
              style={{ backgroundColor: "#465fff" }}
            >
              <Shield className="w-8 h-8 text-white animate-pulse" />
            </div>
            <div
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#465fff" }}
            >
              <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            </div>
          </div>
        </div>

        {/* Title */}

        {/* Animated icons */}
        <div className="flex justify-center space-x-6 mb-8">
          {[BarChart3, Users, Settings].map((Icon, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg bg-white/10 transition-all duration-500 ${
                currentStep === index ? "scale-110 shadow-lg" : "scale-100"
              }`}
              style={{
                backgroundColor:
                  currentStep === index ? "#465fff" : "rgba(70, 95, 255, 0.1)",
              }}
            >
              <Icon
                className={`w-5 h-5 ${
                  currentStep === index ? "text-white" : "text-gray-600"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              style={{ backgroundColor: "#465fff", width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-center mt-2">
            <span className="text-2xl font-bold" style={{ color: "#465fff" }}>
              {progress}%
            </span>
          </div>
        </div>

        {/* Loading steps */}
        <div className="text-center">
          <div className="h-6 flex items-center justify-center">
            <p className="text-gray-600 text-sm animate-fade-in-out">
              {loadingSteps[currentStep]}
            </p>
          </div>
        </div>

        {/* Spinning loader */}
        <div className="flex justify-center mt-6">
          <div className="relative">
            <div
              className="w-8 h-8 border-4 border-gray-200 rounded-full animate-spin"
              style={{ borderTopColor: "#465fff" }}
            ></div>
            <div
              className="absolute inset-1 w-6 h-6 border-2 border-gray-100 rounded-full animate-spin animate-reverse"
              style={{ borderTopColor: "#465fff" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Bottom floating elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          {[1, 2, 3].map((dot) => (
            <div
              key={dot}
              className="w-2 h-2 rounded-full animate-bounce"
              style={{
                backgroundColor: "#465fff",
                animationDelay: `${dot * 0.1}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LoadingPage;
