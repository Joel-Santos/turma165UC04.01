import { alunos } from "../../data/alunos.data.js";

export class AlunoModel {

    static listarAlunos() {
        return alunos;
    }

    static buscarAlunoId(id) {
        return alunos.find(
            a => a.id === parseInt(id)
        );
    }

    static buscarAlunoEmail(email) {
        return alunos.find(
            a => a.email === email
        );
    }

    static buscarAlunoMatricula(matricula) {
        return alunos.find(
            a => a.matricula === matricula
        );
    }

    static criarAluno(matricula, nome, email, cursoId) {
        const novoAluno = {
            id: alunos.length + 1,
            matricula: matricula,
            nome: nome,
            email: email,
            cursoId: parseInt(cursoId)
        };

        alunos.push(novoAluno);
        return novoAluno;
    }

    static atualizarAluno(id, matricula, nome, email, cursoId) {
        const index = alunos.findIndex(
            a => a.id === parseInt(id)
        );

        if (index === -1) {
            return false;
        }

        alunos[index] = {
            id: parseInt(id),
            matricula: matricula,
            nome: nome,
            email: email,
            cursoId: parseInt(cursoId)
        };

        return alunos[index];
    }

    static deletarAluno(id) {
        const index = alunos.findIndex(
            a => a.id === parseInt(id)
        );

        if (index === -1) {
            return false;
        }

        alunos.splice(index, 1);
        return true;
    }

}
