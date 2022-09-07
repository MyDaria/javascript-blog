'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  clickedElement.classList.add('active');
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  const articleSelector =  clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(articleSelector);

  targetArticle.classList.add('active');
  
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(customSelector = ''){

  const titleList = document.querySelector(optTitleListSelector);
  document.querySelector(optTitleListSelector).innerHTML = '';

  const articles =  document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for(let article of articles){
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

const optArticleTagsSelector = '.post-tags .list';

function generateTags(){
  const articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles){
    const tagWrapper = article.querySelector(optArticleTagsSelector);

    let html = '';

    const articleTags =  article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');

    for(let tag of articleTagsArray){
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      html = html + '  ' + linkHTML;
    }
    tagWrapper.innerHTML = html;
  }
}
generateTags();

function tagClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  for(let activeTagLink of activeTagLinks){
    activeTagLink.classList.remove('active');
  }

  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  for(let tagLink of tagLinks){
    tagLink.classList.add('active');
  }
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

  for(let tagLink of tagLinks){
    tagLink.addEventListener('click', tagClickHandler);
  }
}
addClickListenersToTags();

const optArticleAuthorSelector = '.post-author';

function generateAuthors(){
  const articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles){
    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    let html = '';

    const authorName =  article.getAttribute('data-author');
    const linkHTML = '<a href="#author' + authorName + '"><span>' + 'by ' + authorName + '</span></a>';

    html = html + linkHTML;

    authorWrapper.innerHTML = html;
  }
  
}
generateAuthors();

function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Author was clicked!');

  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author', '');
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author"]');

  for(let activeAuthorLink of activeAuthorLinks){
    activeAuthorLink.classList.remove('active');
  }

  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('authorLinks:', authorLinks);

  for(let authorLink of authorLinks){
    authorLink.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){   
  const authorLinks = document.querySelectorAll('a[href^="#author"]');
  console.log('authorLinks:', authorLinks);

  for(let authorLink of authorLinks){
    authorLink.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();