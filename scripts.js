// Navegação Suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

// Ativar Links da Navbar com Base na Seção Atual
window.addEventListener('scroll', function () {
  let sections = document.querySelectorAll('section');
  let navLinks = document.querySelectorAll('.navbar-nav a');

  sections.forEach(section => {
      let top = window.scrollY;
      let offset = section.offsetTop - 150;
      let height = section.offsetHeight;
      let id = section.getAttribute('id');

      if (top >= offset && top < offset + height) {
          navLinks.forEach(link => {
              link.classList.remove('active');
              document.querySelector('.navbar-nav a[href*=' + id + ']').classList.add('active');
          });
      }
  });
});

// Animação Simples nos Elementos ao Descer a Página
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('show');
      }
  });
});

document.querySelectorAll('.section, .service-box, .portfolio-item').forEach(section => {
  observer.observe(section);
});

// Interceptar Envio do Formulário e Mostrar Mensagem de Sucesso
document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Previne o comportamento padrão do formulário
  
  var form = event.target;
  var formData = new FormData(form);

  fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
          'Accept': 'application/json'
      }
  }).then(response => {
      var messageBox = document.getElementById('form-message');
      if (response.ok) {
          messageBox.textContent = 'Mensagem enviada com sucesso!';
          messageBox.classList.remove('alert-danger');
          messageBox.classList.add('alert-success');
          form.reset(); // Limpa o formulário após o envio
      } else {
          response.json().then(data => {
              if (Object.hasOwn(data, 'errors')) {
                  messageBox.textContent = data["errors"].map(error => error["message"]).join(", ");
              } else {
                  messageBox.textContent = 'Oops! Ocorreu um problema ao enviar sua mensagem.';
              }
              messageBox.classList.remove('alert-success');
              messageBox.classList.add('alert-danger');
          });
      }
      messageBox.style.display = 'block';
      setTimeout(function() {
          messageBox.style.display = 'none';
      }, 12000); // Mensagem desaparece após 12 segundos
  }).catch(error => {
      var messageBox = document.getElementById('form-message');
      messageBox.textContent = 'Oops! Ocorreu um problema ao enviar sua mensagem.';
      messageBox.classList.remove('alert-success');
      messageBox.classList.add('alert-danger');
      messageBox.style.display = 'block';
      setTimeout(function() {
          messageBox.style.display = 'none';
      }, 12000); // Mensagem desaparece após 12 segundos
  });
});

// Alternar entre temas light e dark
document.getElementById('theme-toggle').addEventListener('click', function() {
  document.body.classList.toggle('dark-theme');
  
  // Muda o texto do botão conforme o tema ativo
  if (document.body.classList.contains('dark-theme')) {
      this.textContent = 'Light Mode';
  } else {
      this.textContent = 'Dark Mode';
  }
  
  // Salva a preferência no localStorage
  if (document.body.classList.contains('dark-theme')) {
      localStorage.setItem('theme', 'dark');
  } else {
      localStorage.setItem('theme', 'light');
  }
});

// Verifica a preferência de tema no carregamento da página
document.addEventListener('DOMContentLoaded', function() {
  if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-theme');
      document.getElementById('theme-toggle').textContent = 'Light Mode';
  }
});
