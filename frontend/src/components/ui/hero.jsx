import Balancer from "react-wrap-balancer"
import { Target } from "lucide-react";
import { useNavigate } from "react-router-dom";


import Button from "./button" 
import logo from "../../assets/logo.png"
const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="min-w-screen">
      <div className="container mx-auto flex flex-col items-center text-center px-4">
        
        <img
          src={logo}
          width={172}
          height={72}
          alt="Company Logo"
          className="mb-6 md:mb-8 dark:invert"
        />

        <h1 className="mb-2 text-3xl font-bold md:text-5xl">
          <Balancer>
            Search. Solve. Revise.
          </Balancer>
        </h1>

        <h3 className="text-muted-foreground max-w-xl">
          <Balancer>
            Find DSA problems across <b>LeetCode</b>, <b>CodeChef</b>, and <b>Codeforces</b>, and revise smarter with topic-based practice.
          </Balancer>
        </h3>

        <div className="mt-6 flex gap-2 md:mt-12">
          <Button asChild className="cursor-pointer">
            <span onClick={() => navigate("/search")} className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Practise
            </span>
          </Button>

          <Button variant="ghost" asChild className="cursor-pointer">
            <span onClick={() => navigate("/revise")}>Revise →</span>
          </Button>
        </div>

      </div>
    </section>
  )
}

export default Hero