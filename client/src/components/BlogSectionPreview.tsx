import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { blogPosts } from '@/lib/blogData';

const BlogSectionPreview = () => {
  // Get the latest 3 blog posts
  const latestPosts = [...blogPosts].slice(0, 3);
  
  return (
    <section className="py-16 md:py-24 bg-neutral-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Latest Blog Posts
          </motion.h2>
          <motion.p 
            className="text-lg text-neutral-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Insights and tips on web development, design trends, and digital strategies
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestPosts.map((post, index) => (
            <motion.div 
              key={post.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm group h-full flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <a className="block h-full flex flex-col">
                  <div className="h-48 bg-neutral-200 relative overflow-hidden">
                    <img 
                      src={post.coverImage} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-medium text-neutral-500">{post.date}</span>
                      <span className="bg-primary/10 text-primary text-xs px-2.5 py-0.5 rounded">{post.category}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-neutral-900 group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-neutral-700 mb-4 line-clamp-2 flex-1">{post.excerpt}</p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-sm text-neutral-500">{post.readTime} min read</span>
                      <span className="text-primary font-medium group-hover:underline">Read more</span>
                    </div>
                  </div>
                </a>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link href="/blog">
            <a className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-lg transition-colors">
              View all articles <i className="ri-arrow-right-line ml-2"></i>
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSectionPreview;