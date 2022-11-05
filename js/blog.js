const blogGridDOM = document.querySelector('.blog-grid');

const blogpostHTML = BLOGPOSTS.map((post) => {
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
}).join('');

blogGridDOM.innerHTML = blogpostHTML;
