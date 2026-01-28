import { cursos } from "../../data/cursos.data.js";
import { alunos } from "../../data/alunos.data.js";

export class CursoModel {

    static listarCursos() {
        return cursos;
    }
    static buscarCursoId(id) {
        return cursos.find(c => c.id === parseInt(id));
    }

    static criarCurso(nome) {
        const novoCurso =
        {
            id: cursos.length + 1,
            nome: nome
        }
        cursos.push(novoCurso);
        return novoCurso;
    }
    static atualizarCurso(id, nome) {
        const index = cursos.findIndex(c => c.id === parseInt(id));
        if (index === -1) {
            return false;
        }
        cursos[index] = {
            id: id,
            nome: nome
        };
        return cursos[index];
    }
    static deletarCurso(id) {
        const index = cursos.findIndex(c => c.id === parseInt(id));
        if (index === -1) {
            return false;
        }
        cursos.splice(index, 1);
        return true;
    }

    static listarAlunosPorCurso(idCurso) {
        return alunos.filter(a => a.cursoId === parseInt(idCurso));
    }

}