import { motion } from 'framer-motion';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AnimatedGroup } from '@/components/ui/animated-group';

interface TeamMemberProps {
  name: string;
  title: string;
  bio: string;
  experience: string;
  delay?: number;
}

const TeamMember = ({ name, title, bio, experience, delay = 0 }: TeamMemberProps) => {
  return (
    <motion.div 
      className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-md"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">{name}</h3>
        <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">{title}</p>
        <p className="text-neutral-700 dark:text-neutral-300 mb-4">{bio}</p>
        <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4 mt-4">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">{experience}</p>
        </div>
      </div>
    </motion.div>
  );
};

const AboutPage = () => {
  return (
    <>
      <Header />
      
      <main className="pt-24 pb-16">
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                We are the people who make up our team
              </motion.h1>
              <motion.p 
                className="text-xl text-neutral-700 dark:text-neutral-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Our philosophy is simple: hire great people and give them the resources and support to do their best work.
              </motion.p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <TeamMember 
                name="Sai Rewanth"
                title="Frontend Developer & Designer"
                bio="Specializing in creating beautiful, responsive web interfaces with a focus on user experience and performance optimization."
                experience="Former frontend developer for multiple tech startups. Expert in React, TypeScript, and modern CSS frameworks."
                delay={0.2}
              />
              
              <TeamMember 
                name="Saatvik Puranam"
                title="Full-Stack Engineer"
                bio="Passionate about building scalable web applications from the ground up with expertise in both frontend and backend technologies."
                experience="Lead engineer on several successful web projects. Skilled in Node.js, database design, and API development."
                delay={0.4}
              />
            </div>
            
            <AnimatedGroup className="mt-20 max-w-4xl mx-auto" delay={0.6}>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-8">
                <h2 className="text-2xl font-semibold mb-4 text-neutral-900 dark:text-white">Our Approach</h2>
                <p className="text-neutral-700 dark:text-neutral-300 mb-6">
                  We believe in creating web solutions that not only look good but also deliver real value to our clients and their users. 
                  Our approach combines technical expertise with creative problem-solving to build websites that stand out.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mt-8">
                  <motion.div 
                    className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-sm"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <h3 className="font-medium mb-2 text-neutral-900 dark:text-white">User-Focused</h3>
                    <p className="text-sm text-neutral-700 dark:text-neutral-400">We prioritize user experience in everything we build.</p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-sm"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <h3 className="font-medium mb-2 text-neutral-900 dark:text-white">Performance-Driven</h3>
                    <p className="text-sm text-neutral-700 dark:text-neutral-400">Fast-loading, optimized websites that convert visitors.</p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-sm"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <h3 className="font-medium mb-2 text-neutral-900 dark:text-white">Innovative</h3>
                    <p className="text-sm text-neutral-700 dark:text-neutral-400">Always exploring new technologies and approaches.</p>
                  </motion.div>
                </div>
              </div>
            </AnimatedGroup>
            
            <motion.div 
              className="text-center mt-20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <Link href="/">
                <a className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Home
                </a>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default AboutPage;