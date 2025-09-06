// URL to fetch posts
const API_URL = "https://jsonplaceholder.typicode.com/posts";

// 1. Closure: keeps track of how many times we call fetch
function createCounter() {
  let count = 0 
  return function () {
    count++
    return count
  };
}
const fetchCounter = createCounter()

// 2. Constructor function for Post
function Post(id, userId, title, body) {
  this.id = id
  this.userId = userId
  this.title = title
  this.body = body
}
Post.prototype.logDetails = function () {
  console.log(`Post #${this.id} (User ${this.userId}): ${this.title}`);
};

// 3. Function to aggregate posts per userId
function countPostsByUser(posts) {
  return posts.reduce((acc, post) => {
    acc[post.userId] = (acc[post.userId] || 0) + 1;
    return acc;
  }, {});
}

// 4. Async function to fetch posts
async function fetchPosts() {
  try {
    const callNum = fetchCounter() 
    const res = await fetch(API_URL)
    const posts = await res.json()

    console.log(`Fetch call #${callNum}, got ${posts.length} posts`)

   
    const counts = countPostsByUser(posts);
    console.log("Number of posts per user:", counts);

    const postObjects = posts.map(
      (p) => new Post(p.id, p.userId, p.title, p.body)
    );

    // Show details of first 3 posts
    postObjects.slice(0, 3).forEach((p) => p.logDetails());
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}
// 5. Run the demo
fetchPosts();
