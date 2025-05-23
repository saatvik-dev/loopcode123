import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { blogPosts } from '@/lib/blogData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categoriesSet = new Set(blogPosts.map(post => post.category));
  const categories = Array.from(categoriesSet);
  
  // Filter posts by category
  const filteredPosts = selectedCategory 
    ? blogPosts.filter(post => post.category === selectedCategory)
    : blogPosts;

  return (
    <div className="bg-neutral-100 min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900">Blog & Insights</h1>
          <p className="text-xl text-neutral-700">
            Thoughts, tips, and insights about web development, design, and digital trends
          </p>
        </motion.div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button 
            onClick={() => setSelectedCategory(null)} 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === null 
                ? 'bg-primary text-white' 
                : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
            }`}
          >
            All Posts
          </button>
          
          {categories.map(category => (
            <button 
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category 
                  ? 'bg-primary text-white' 
                  : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div 
              key={post.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <a className="block">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.coverImage} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-medium text-neutral-500">{post.date}</span>
                      <span className="bg-neutral-100 text-neutral-700 text-xs px-2.5 py-0.5 rounded">{post.category}</span>
                    </div>
                    <h2 className="text-xl font-semibold mb-3 text-neutral-900 hover:text-primary transition-colors">{post.title}</h2>
                    <p className="text-neutral-700 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-neutral-500">{post.readTime} min read</span>
                      <span className="text-primary font-medium hover:text-primary/80 transition-colors">Read more</span>
                    </div>
                  </div>
                </a>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* If no posts with selected category */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-neutral-700">No posts found in this category</h3>
            <button 
              onClick={() => setSelectedCategory(null)}
              className="mt-4 text-primary hover:text-primary/80 font-medium"
            >
              View all posts
            </button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Blog;