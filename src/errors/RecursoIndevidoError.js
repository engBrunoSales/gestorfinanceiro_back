module.exports = function RecursoIndevidoError(message = 'O usuário não tem permissão para acessar esse recurso.') {
  this.name = 'RecursoIndevidoError'
  this.message = message
}