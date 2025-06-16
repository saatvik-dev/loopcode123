import { motion } from 'framer-motion';
import { AnimatedGroup } from '@/components/ui/animated-group';
import saiImage from '@assets/1746890035651.jpeg';
import saatvikImage from '@assets/WhatsApp Image 2025-05-26 at 13.19.48.jpeg';

interface TeamMemberProps {
  name: string;
  title: string;
  bio: string;
  experience: string;
  image: string;
  delay?: number;
}

const TeamMember = ({ name, title, bio, experience, image, delay = 0 }: TeamMemberProps) => {
  return (
    <motion.div 
      className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-md"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <div className="aspect-square w-full bg-neutral-100 dark:bg-neutral-700 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
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

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-neutral-100">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            We are the people who make up our team
          </motion.h2>
          <motion.p 
            className="text-xl text-neutral-700 dark:text-neutral-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
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
            image="https://ik.imagekit.io/4ep9dg1krg/1746890035651.jpeg?updatedAt=1750096291923"
            delay={0.2}
          />
          
          <TeamMember 
            name="Saatvik Puranam"
            title="Full-Stack Engineer"
            bio="Passionate about building scalable web applications from the ground up with expertise in both frontend and backend technologies."
            experience="Lead engineer on several successful web projects. Skilled in Node.js, database design, and API development."
            image="https://ik.imagekit.io/4ep9dg1krg/WhatsApp%20Image%202025-05-26%20at%2013.19.48.jpeg?updatedAt=1750096348018"
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
      </div>
    </section>
  );
};

export default AboutSection;