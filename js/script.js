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
  titleList.innerHTML = '';

  const articles =  document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for(let article of articles){
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    html = html + linkHTML;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

}
generateTitleLinks();

function calculateTagsParams(tags){

  const params ={ min: 99999, max: 0};

  for(let tag in tags){
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }

    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return params;
}

const optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';

function calculateTagClass(count, params){

  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

  return optCloudClassPrefix + classNumber;
}

const optTagsListSelector = '.tags.list',
  optArticleTagsSelector = '.post-tags .list';

function generateTags(){

  let allTags = {};

  const articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles){
    const tagWrapper = article.querySelector(optArticleTagsSelector);

    let html = '';

    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');

    for(let tag of articleTagsArray){
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      html = html + '  ' + linkHTML;

 
      if(!allTags.hasOwnProperty(tag)){
 
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    tagWrapper.innerHTML = html;
  }

  const tagList = document.querySelector(optTagsListSelector);
  console.log('tagList:', tagList);

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  let allTagsHTML = '';

  for(let tag in allTags){
    const tagLinkHTML = '<li><a href="#tag-' + tag + '" ' + 'class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li>';
    console.log('tagLinkHTML:', tagLinkHTML);
    allTagsHTML += ' ' + tagLinkHTML;

  }

  tagList.innerHTML = allTagsHTML;
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

function calculateAuthorsParams(authors){

  const params ={ min: 99999, max: 0};

  for(let author in authors){
    console.log(author + 'is used' + authors[author] + 'times');

    if(authors[author] > params.max){
      params.max = authors[author];
    }

    if(authors[author] < params.min){
      params.min = authors[author];
    }
  }
  return params;
}

const optArticleAuthorSelector = '.post-author',
  optAuthorsListSelector = '.authors.list';

function generateAuthors(){
  let allAuthors = {};

  const articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles){
    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    let html = '';

    const authorName =  article.getAttribute('data-author');
    console.log('authorName:', authorName);
    const linkHTML = '<a href="#author' + authorName + '"><span>' + 'by ' + authorName + '</span></a>';

    html = html + linkHTML;

    if(!allAuthors.hasOwnProperty(authorName)){

      allAuthors[authorName] = 1;
    } else {
      allAuthors[authorName]++;
    }
    authorWrapper.innerHTML = html;
  }

  const authorList = document.querySelector(optAuthorsListSelector);
  console.log('AuthorList:', authorList);

  const authorTagsParams = calculateAuthorsParams(allAuthors);
  console.log('authorTagsParams:', authorTagsParams);

  let allAuthorsHTML = '';

  for(let author in allAuthors){
    const authorLinkHTML = '<li><a href="#author' + author + '"><span>' + author + ' (' + allAuthors[author] + ')' + '</span></a></li>';
    console.log('authorLinkHTML:', authorLinkHTML);
    allAuthorsHTML += ' ' + authorLinkHTML;

  }

  authorList.innerHTML = allAuthorsHTML;
}

generateAuthors();

function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
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

