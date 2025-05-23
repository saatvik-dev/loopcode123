import { useState, useEffect } from 'react';
import { Link, useRoute } from 'wouter';
import { motion } from 'framer-motion';
import { blogPosts, BlogPost as BlogPostType } from '@/lib/blogData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const BlogPost = () => {
  const [, params] = useRoute('/blog/:slug');
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);

  useEffect(() => {
    if (params?.slug) {
      const currentPost = blogPosts.find(p => p.slug === params.slug);
      if (currentPost) {
        setPost(currentPost);
        
        // Find related posts based on category or tags
        const related = blogPosts
          .filter(p => p.id !== currentPost.id && 
            (p.category === currentPost.category || 
             p.tags.some(tag => currentPost.tags.includes(tag)))
          )
          .slice(0, 3);
        setRelatedPosts(related);
      }
    }
  }, [params]);

  if (!post) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Post not found</h2>
          <Link href="/blog">
            <a className="text-primary hover:text-primary/80 font-medium">Return to blog</a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-100 min-h-screen">
      <Header />
      
      <article className="container mx-auto px-4 py-16 md:py-24">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back to blog */}
          <Link href="/blog">
            <a className="inline-flex items-center text-primary hover:text-primary/80 mb-8 font-medium">
              <i className="ri-arrow-left-line mr-2"></i> Back to all articles
            </a>
          </Link>
          
          {/* Hero Section */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">{post.category}</span>
              <span className="text-neutral-500 text-sm">{post.readTime} min read</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-neutral-900">{post.title}</h1>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-300 flex items-center justify-center text-neutral-700 font-medium">
                  {post.author.split(' ').map(word => word[0]).join('')}
                </div>
                <div>
                  <p className="font-medium text-neutral-900">{post.author}</p>
                  <p className="text-sm text-neutral-500">{post.date}</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden h-[300px] md:h-[400px] lg:h-[500px] mb-10">
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Content */}
          <div 
            className="prose prose-lg md:prose-xl max-w-none prose-headings:text-neutral-900 prose-p:text-neutral-700 prose-li:text-neutral-700 prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary/80 mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-12">
            {post.tags.map(tag => (
              <span 
                key={tag} 
                className="bg-neutral-200 text-neutral-700 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
          
          {/* Share */}
          <div className="border-t border-b border-neutral-200 py-6 mb-12">
            <p className="font-medium text-neutral-900 mb-3">Share this article</p>
            <div className="flex gap-4">
              <button className="text-neutral-700 hover:text-primary transition-colors">
                <i className="ri-twitter-x-line text-xl"></i>
              </button>
              <button className="text-neutral-700 hover:text-primary transition-colors">
                <i className="ri-linkedin-line text-xl"></i>
              </button>
              <button className="text-neutral-700 hover:text-primary transition-colors">
                <i className="ri-facebook-circle-line text-xl"></i>
              </button>
              <button className="text-neutral-700 hover:text-primary transition-colors">
                <i className="ri-link text-xl"></i>
              </button>
            </div>
          </div>
          
          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-neutral-900">Related Articles</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.div 
                    key={relatedPost.id}
                    className="bg-white rounded-xl overflow-hidden shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Link href={`/blog/${relatedPost.slug}`}>
                      <a className="block">
                        <div className="h-40 overflow-hidden">
                          <img 
                            src={relatedPost.coverImage} 
                            alt={relatedPost.title} 
                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                          />
                        </div>
                        <div className="p-4">
                          <span className="text-xs text-neutral-500 mb-2 block">{relatedPost.date}</span>
                          <h4 className="text-lg font-semibold mb-2 text-neutral-900 line-clamp-2 hover:text-primary transition-colors">{relatedPost.title}</h4>
                          <span className="text-primary text-sm font-medium">Read article</span>
                        </div>
                      </a>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          
          {/* Call to Action */}
          <div className="bg-primary/10 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-neutral-900">Need help with your web project?</h3>
            <p className="text-lg mb-6 text-neutral-700">I'm available for freelance projects and consulting</p>
            <Link href="/#contact">
              <a className="inline-block bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-lg transition-colors">
                Get in touch
              </a>
            </Link>
          </div>
        </motion.div>
      </article>
      
      <Footer />
    </div>
  );
};

export default BlogPost;