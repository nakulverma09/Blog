const dummyBlogs = [
    {
      title: "The Rise of Quantum Computing in Modern Technology",
      category: "Technology",
      user: "67ea52b1ce52972b73a476bf",
      content: "Quantum computing is emerging as the next big leap in tech...".repeat(10),
      tags: ["quantum", "future", "tech"],
      isPublished: true,
    },
    {
      title: "How Online Learning Is Transforming Education",
      category: "Education & Learning",
      user: "67ea52b1ce52972b73a476bf",
      content: "Digital platforms are reshaping how we learn across the globe...".repeat(10),
      tags: ["edtech", "online", "learning"],
      isPublished: true,
    },
    {
      title: "10 Habits of Highly Effective People",
      category: "Lifestyle",
      user: "67ea52b1ce52972b73a476bf",
      content: "Success is often tied to consistent habits and mindset...".repeat(10),
      tags: ["habits", "success", "lifestyle"],
      isPublished: true,
    },
    {
      title: "How to Budget Like a Pro and Save Money",
      category: "Finance",
      user: "67ea52b1ce52972b73a476bf",
      content: "Budgeting is the backbone of personal financial success...".repeat(10),
      tags: ["money", "budgeting", "savings"],
      isPublished: true,
    },
    {
      title: "Top 10 Must-Watch Netflix Shows in 2025",
      category: "Entertainment",
      user: "67ea52b1ce52972b73a476bf",
      content: "Streaming platforms are competing to win your screen time...".repeat(10),
      tags: ["netflix", "shows", "entertainment"],
      isPublished: true,
    },
    {
      title: "Breaking Down Global News: April 2025 Edition",
      category: "News & Current Affairs",
      user: "67ea52b1ce52972b73a476bf",
      content: "This month, several key international events unfolded...".repeat(10),
      tags: ["news", "world", "current"],
      isPublished: true,
    },
    {
      title: "Daily Motivation to Keep You Moving Forward",
      category: "Inspiration & Personal Development",
      user: "67ea52b1ce52972b73a476bf",
      content: "Every day brings new opportunities to grow and evolve...".repeat(10),
      tags: ["motivation", "growth", "mindset"],
      isPublished: true,
    },
    {
      title: "The Untold Stories of Ancient Civilizations",
      category: "Culture & History",
      user: "67ea52b1ce52972b73a476bf",
      content: "From Mesopotamia to Egypt, ancient worlds offer deep insight...".repeat(10),
      tags: ["history", "civilizations", "culture"],
      isPublished: true,
    },
    {
      title: "Why Every Developer Should Master React in 2025",
      category: "Coding & Projects",
      user: "67ea52b1ce52972b73a476bf",
      content: "React continues to dominate the frontend framework landscape...".repeat(10),
      tags: ["react", "javascript", "frontend"],
      isPublished: true,
    },
    {
      title: "Top 5 Unusual Hobbies to Explore This Year",
      category: "Miscellaneous",
      user: "67ea52b1ce52972b73a476bf",
      content: "Trying something new can be refreshing and fun...".repeat(10),
      tags: ["hobbies", "exploration", "fun"],
      isPublished: true,
    },
  
    // Generate 40 more entries dynamically
    ...Array.from({ length: 40 }).map((_, index) => {
      const categories = [
        "Technology",
        "Education & Learning",
        "Lifestyle",
        "Finance",
        "Entertainment",
        "News & Current Affairs",
        "Inspiration & Personal Development",
        "Culture & History",
        "Coding & Projects",
        "Miscellaneous",
      ];
      const titles = [
        "Exploring the Future of",
        "What You Need to Know About",
        "Top Trends in",
        "How to Master",
        "Beginner’s Guide to",
        "Secrets Behind Successful",
        "Why Everyone is Talking About",
        "A Deep Dive into",
        "The Impact of",
        "Latest Innovations in",
      ];
      const tags = [["tech"], ["growth"], ["mindset"], ["budget"], ["inspire"], ["2025"], ["guide"], ["coding"], ["culture"], ["update"]];
  
      const catIndex = index % categories.length;
      const titlePrefix = titles[index % titles.length];
  
      return {
        title: `${titlePrefix} ${categories[catIndex]} ${index + 1}`,
        category: categories[catIndex],
        user: "67ea52b1ce52972b73a476bf",
        content: `This is blog content for "${titlePrefix} ${categories[catIndex]}" number ${index + 1}. `.repeat(10),
        tags: tags[index % tags.length],
        isPublished: true,
      };
    }),
  ];
  
  module.exports = dummyBlogs;
  