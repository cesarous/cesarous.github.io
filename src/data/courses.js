// Courses are a distinct category from client/freelance projects, so they
// get their own Home page section and their own data source rather than
// living inside projects.js.
export const courses = [
  {
    id: 0,
    title: 'Python Concurrency Course',
    link: '/concurrency-course',
    linkLabel: 'View the course',
    image: '/python-concurrency-course.png',
    width: 512,
    height: 512,
    description: "A free, hands-on course on Python threads and multiprocessing - validating balanced parentheses in data too large for memory, split across workers and combined, MapReduce-style. 31 lessons and 30 runnable problems."
  },
];
