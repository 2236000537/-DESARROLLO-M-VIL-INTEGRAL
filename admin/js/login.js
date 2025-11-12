/**
 * Lógica del formulario de login
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elementos del DOM
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const togglePasswordBtn = document.getElementById('togglePassword');
  const loginBtn = document.getElementById('loginBtn');
  const errorAlert = document.getElementById('errorAlert');
  const errorMessage = document.getElementById('errorMessage');
  const btnText = loginBtn.querySelector('.btn-text');
  const spinner = loginBtn.querySelector('.spinner');

  // Verificar si ya está autenticado
  if (Auth.estaAutenticado()) {
    window.location.href = 'panel.html';
    return;
  }

  // Toggle mostrar/ocultar contraseña
  togglePasswordBtn.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    togglePasswordBtn.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
  });

  // Validación en tiempo real
  emailInput.addEventListener('blur', validarEmail);
  passwordInput.addEventListener('blur', validarPassword);

  // Limpiar errores al escribir
  emailInput.addEventListener('input', () => limpiarError('email'));
  passwordInput.addEventListener('input', () => limpiarError('password'));

  // Manejar envío del formulario
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validar campos
    const emailValido = validarEmail();
    const passwordValido = validarPassword();

    if (!emailValido || !passwordValido) {
      return;
    }

    // Deshabilitar botón y mostrar spinner
    loginBtn.disabled = true;
    btnText.style.display = 'none';
    spinner.style.display = 'inline-block';
    ocultarAlerta();

    try {
      // Obtener valores
      const email = emailInput.value.trim();
      const password = passwordInput.value;

      // Intentar login
      const resultado = await Auth.login(email, password);

      if (resultado.success) {
        // Login exitoso
        mostrarExito();
        
        // Redirigir al panel después de 1 segundo
        setTimeout(() => {
          window.location.href = 'panel.html';
        }, 1000);
      } else {
        // Login fallido
        mostrarError(resultado.error || 'Error al iniciar sesión');
        loginBtn.disabled = false;
        btnText.style.display = 'inline';
        spinner.style.display = 'none';
      }

    } catch (error) {
      console.error('Error inesperado:', error);
      mostrarError('Error de conexión con el servidor');
      loginBtn.disabled = false;
      btnText.style.display = 'inline';
      spinner.style.display = 'none';
    }
  });

  /**
   * Validar email
   */
  function validarEmail() {
    const email = emailInput.value.trim();
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      mostrarErrorCampo('email', 'El email es requerido');
      return false;
    }

    if (!emailRegex.test(email)) {
      mostrarErrorCampo('email', 'Email inválido');
      return false;
    }

    limpiarError('email');
    return true;
  }

  /**
   * Validar contraseña
   */
  function validarPassword() {
    const password = passwordInput.value;

    if (!password) {
      mostrarErrorCampo('password', 'La contraseña es requerida');
      return false;
    }

    if (password.length < 6) {
      mostrarErrorCampo('password', 'La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    limpiarError('password');
    return true;
  }

  /**
   * Mostrar error en campo específico
   */
  function mostrarErrorCampo(campo, mensaje) {
    const input = document.getElementById(campo);
    const errorElement = document.getElementById(`${campo}Error`);
    
    input.style.borderColor = '#EF4444';
    errorElement.textContent = mensaje;
    errorElement.classList.add('show');
  }

  /**
   * Limpiar error de campo
   */
  function limpiarError(campo) {
    const input = document.getElementById(campo);
    const errorElement = document.getElementById(`${campo}Error`);
    
    input.style.borderColor = '#E5E7EB';
    errorElement.textContent = '';
    errorElement.classList.remove('show');
  }

  /**
   * Mostrar alerta de error
   */
  function mostrarError(mensaje) {
    errorMessage.textContent = mensaje;
    errorAlert.style.display = 'flex';
    
    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
      ocultarAlerta();
    }, 5000);
  }

  /**
   * Ocultar alerta
   */
  function ocultarAlerta() {
    errorAlert.style.display = 'none';
  }

  /**
   * Mostrar mensaje de éxito
   */
  function mostrarExito() {
    errorAlert.style.display = 'flex';
    errorAlert.className = 'alert alert-success';
    errorMessage.textContent = '✅ Login exitoso. Redirigiendo...';
    errorAlert.style.background = '#D1FAE5';
    errorAlert.style.color = '#065F46';
    errorAlert.style.borderColor = '#6EE7B7';
  }
});

