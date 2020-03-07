-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.11-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              10.3.0.5771
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Copiando estrutura do banco de dados para agendamento
CREATE DATABASE IF NOT EXISTS `agendamento` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `agendamento`;

-- Copiando estrutura para tabela agendamento.agenda
DROP TABLE IF EXISTS `agenda`;
CREATE TABLE IF NOT EXISTS `agenda` (
  `id_agenda` int(11) NOT NULL AUTO_INCREMENT,
  `data` date NOT NULL,
  `horario_aula` varchar(20) NOT NULL,
  `turno` varchar(20) NOT NULL,
  `id_pessoa` int(11) NOT NULL,
  `id_equipamento` int(11) DEFAULT NULL,
  `id_ambiente` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_agenda`),
  KEY `ambiente_agenda_fk` (`id_ambiente`),
  KEY `equipamento_agenda_fk` (`id_equipamento`),
  KEY `pessoa_agenda_fk` (`id_pessoa`),
  CONSTRAINT `ambiente_agenda_fk` FOREIGN KEY (`id_ambiente`) REFERENCES `ambiente` (`id_ambiente`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `equipamento_agenda_fk` FOREIGN KEY (`id_equipamento`) REFERENCES `equipamento` (`id_equipamento`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `pessoa_agenda_fk` FOREIGN KEY (`id_pessoa`) REFERENCES `pessoa` (`id_pessoa`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela agendamento.ambiente
DROP TABLE IF EXISTS `ambiente`;
CREATE TABLE IF NOT EXISTS `ambiente` (
  `id_ambiente` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `num_sala` int(11) NOT NULL,
  `capacidade_publico` int(11) NOT NULL,
  `quantidade_computadores` int(11) DEFAULT NULL,
  `possui_internet` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_ambiente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela agendamento.disciplina
DROP TABLE IF EXISTS `disciplina`;
CREATE TABLE IF NOT EXISTS `disciplina` (
  `id_disciplina` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  PRIMARY KEY (`id_disciplina`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela agendamento.equipamento
DROP TABLE IF EXISTS `equipamento`;
CREATE TABLE IF NOT EXISTS `equipamento` (
  `id_equipamento` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `marca` varchar(100) NOT NULL,
  `modelo` varchar(100) NOT NULL,
  `descricao` varchar(100) NOT NULL,
  PRIMARY KEY (`id_equipamento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela agendamento.funcao
DROP TABLE IF EXISTS `funcao`;
CREATE TABLE IF NOT EXISTS `funcao` (
  `id_funcao` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  PRIMARY KEY (`id_funcao`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela agendamento.pessoa
DROP TABLE IF EXISTS `pessoa`;
CREATE TABLE IF NOT EXISTS `pessoa` (
  `id_pessoa` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `cpf` varchar(20) NOT NULL,
  `celular` varchar(15) NOT NULL,
  `email_institucional` varchar(50) NOT NULL,
  `email_pessoal` varchar(50) NOT NULL,
  `id_disciplina` int(11) NOT NULL,
  `id_funcao` int(11) NOT NULL,
  PRIMARY KEY (`id_pessoa`),
  KEY `funcao_pessoa_fk` (`id_funcao`),
  KEY `disciplina_pessoa_fk` (`id_disciplina`),
  CONSTRAINT `disciplina_pessoa_fk` FOREIGN KEY (`id_disciplina`) REFERENCES `disciplina` (`id_disciplina`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `funcao_pessoa_fk` FOREIGN KEY (`id_funcao`) REFERENCES `funcao` (`id_funcao`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela agendamento.usuario
DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(50) NOT NULL,
  `senha` varchar(50) NOT NULL,
  `id_pessoa` int(11) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  KEY `pessoa_usuario_fk` (`id_pessoa`),
  CONSTRAINT `pessoa_usuario_fk` FOREIGN KEY (`id_pessoa`) REFERENCES `pessoa` (`id_pessoa`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Exportação de dados foi desmarcado.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
