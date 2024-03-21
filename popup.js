function el(id) {
    return document.getElementById(id);
  }

  function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
  
  async function createModal(data) {
      function insertCss(){
          const css = `@import url(https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap);.modal,.modal__container{position:fixed;z-index:9999}.modal,.modal__container,.modal__pages{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.4s}.modal__body h1,.modal__body p{font-family:"Open Sans";font-style:normal}.btn,.modal{font-family:"Open Sans",sans-serif}.modal__body h1,.modal__body p,.pagination ul,body{padding:0;margin:0}.modal__container{top:0;left:0;display:flex;width:100vw;height:100vh;justify-content:center;align-items:center;background-color:rgba(0,0,0,.5)}.modal{max-width:400px;width:100%;overflow:hidden;border-radius:16px;border:1px solid #eaedf0;background:#fff}.modal__pages__container{overflow-x:hidden}.modal__pages{display:flex;width:calc(400* 2px);overflow-y:visible}.btn,.pagination ul li{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.modal__page{width:400px; min-width: 400px;}.modal__body{padding:24px 24px 12px;display:flex;gap:16px;flex-direction:column}.modal__body h1{color:#324150;font-size:16px;font-weight:600;line-height:24px}.modal__body p{color:#8697a8;font-size:14px;font-weight:400;line-height:20px}.modal__body .details{display:flex;gap:12px;flex-direction:column;align-items:flex-start}.modal__footer{padding:0 24px 24px 60px;display:flex}.btn,.tag{display:inline-block;color:#fff;text-decoration:none;text-align:center;box-sizing:border-box;font-style:normal}.btn{padding:10px 16px;border-radius:5px;background-color:#000;height:36px;font-size:12px;font-weight:600;line-height:16px}.btn.icon{padding:10px}.btn.primary{background:#3547c8;color:#fff}.btn.primary:hover{background:#4e5dcf}.btn.primary:active{background:#6573d5}.btn.secondary{background:#eaedf0;color:#324150}.btn.secondary:hover{background:#d4d8dd}.btn.secondary:active{background:#bec4ca}.tag{padding:4px 12px;border-radius:12px;background-color:#3547c8;height:24px;width:fit-content;font-size:10px;font-weight:700;line-height:normal;text-transform:uppercase}.tag.primary-alt{background:rgba(53,71,200,.16);color:#3547c8}.pagination{display:flex;justify-content:center;align-items:center;flex-grow:1}.pagination ul{display:flex;list-style:none}.pagination ul li{margin:0 4px;width:8px;height:8px;background-color:#bec2c6;border-radius:4px;cursor:pointer}.pagination ul li:hover{background-color:#adb2b8}.pagination ul li.active{background-color:#3547c8;width:24px}`;
          const style = document.createElement('style');
          style.innerHTML = css;
          return document.head.appendChild(style);
      }
  
      function createModalElement(){
          const modal = document.createElement('div');
          modal.classList.add('modal__container');
          modal.id = 'modal__container';
          modal.style.display = 'none';
          modal.style.opacity = '0';
          modal.innerHTML = `
              <div class="modal">
                  <div class="modal__pages__container">
                      <div class="modal__pages">
                          ${data.pages.map(page => `
                              <div class="modal__page">
                                  <div class="modal__header">
                                      <img src="${page.headerImage}">
                                  </div>
                                  <div class="modal__body">
                                      <span class="tag primary-alt">${page.tag}</span>
                                      <div class="details">
                                          <h1 class="title">${page.title}</h1>
                                          <p>${page.description}</p>
                                          <a href="${page.button.link}" class="btn secondary">${page.button.text}</a>
                                      </div>
                                  </div>
                              </div>
                          `).join('')}
                      </div>
                  </div>
                  <div class="modal__footer">
                      <div class="pagination">
                          <ul>
                          </ul>
                      </div>
                      <span class="btn primary icon" data-pagination="next" id="modal__next__button">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11.7633 7.60001L9.04999 4.88668C8.82999 4.66668 8.46999 4.66668 8.24999 4.88668C8.02999 5.10668 8.02999 5.46668 8.24999 5.68668L9.99666 7.43335H4.63666C4.32333 7.43335 4.06999 7.68668 4.06999 8.00001C4.06999 8.31335 4.32333 8.56668 4.63666 8.56668H9.99666L8.24999 10.3133C8.02999 10.5333 8.02999 10.8933 8.24999 11.1133C8.35999 11.2233 8.50666 11.28 8.64999 11.28C8.79333 11.28 8.93999 11.2233 9.04999 11.1133L11.7633 8.40001C11.9833 8.18001 11.9833 7.82001 11.7633 7.60001Z" fill="white"/>
                          </svg>
                      </span>
                      <span class="btn primary" data-modal="close" style="display: none">
                          Fechar
                      </span>
                  </div>
              </div>
          `;
          return document.body.appendChild(modal);
      }
  
      function nextPage(obj) {
          if(currentPage !== pagesCount) {
              setPage(obj, currentPage + 1);
          }
      }
  
      function setPage(obj, page){
          currentPage = page;
          obj.querySelectorAll('.pagination li').forEach(function(li) {
              li.classList.remove('active');
          });
          obj.querySelectorAll('.pagination li')[page - 1].classList.add('active');
          obj.querySelector('.modal__pages').style.transform = `translateX(-${(page - 1) * obj.querySelector('.modal').offsetWidth}px)`;
          if(page === pagesCount) {
              obj.querySelector('[data-pagination="next"]').style.display = 'none';
              modal.querySelector('[data-modal="close"]').style.display = 'block';
          } else {
              obj.querySelector('[data-pagination="next"]').style.display = 'block';
              modal.querySelector('[data-modal="close"]').style.display = 'none';
          }
      }
  
      function hideModal(obj) {
          setCookie('newspopup_close', 'true', 7)
          obj.style.opacity = '0';
          setTimeout(function() {
              obj.remove();
          }, 300);
      }
  
      insertCss();
      const modal = await createModalElement();
  
      const modalPagesDiv = modal.querySelector('.modal__pages');
      const pagesCount = modal.querySelector('.modal__pages').querySelectorAll('.modal__page').length;
      let currentPage = 1;
      const modalWidth = modal.querySelector('.modal').offsetWidth;
      modalPagesDiv.style.width = `${pagesCount * modalWidth}px`;
      for(let i = 1; i <= pagesCount; i++) {
          const li = document.createElement('li');
          if(i === 1) {
              li.classList.add('active');
          }
          modal.querySelector('.pagination ul').appendChild(li);
      }
  
      modal.querySelector('[data-pagination="next"]').addEventListener('click', function() {
          nextPage(modal);
      });
  
      modal.querySelector('[data-modal="close"]').addEventListener('click', function() {
          hideModal(modal);
      });
  
      modal.querySelectorAll('.pagination li').forEach(function(li, index) {
          li.addEventListener('click', function() {
              setPage(modal,index + 1);
          });
      });
  
      modal.style.display = 'flex';
      setTimeout(function() {
          modal.style.opacity = '1';
      }, 1);
  }