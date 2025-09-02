// Script para limpar a lista de convidados do localStorage
if (typeof window !== 'undefined' && window.localStorage) {
  localStorage.removeItem('halloween-guests');
  console.log('Lista de convidados limpa com sucesso!');
} else {
  console.log('localStorage não disponível');
}