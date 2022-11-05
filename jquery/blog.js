/**
 * Everything will run  when user access blog.html page.
 */

const blogGridDOM = $('.blog-grid'); // define location where to render blog post

// Generated blog post html, ready to insert into defined location
const blogpostHTML = $.map(BLOGPOSTS, (post) => {
  return `
 <article class="blogpost">
 <div class="blogpost__thumb">
   <img src="${post.image}" alt="" />
 </div>
 <div class="blogpost__info">
   <h3><a href="${post.url}" target="_blank">${post.title}</a></h3>
   <time>${post.createdAt}</time>
 </div>
 </article>
`;
}).join(''); // merge all elements in blog post html into a string., if not, it will render with ','. Make web is ugly

// insert blog post html into defined location
blogGridDOM.html(blogpostHTML);
