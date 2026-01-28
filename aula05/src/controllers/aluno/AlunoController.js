import { AlunoModel } from "../../models/aluno/AlunoModel.js";
import { CursoModel } from "../../models/curso/CursoModel.js";

export class AlunoController {

    static listarAlunos(req, res) {
        try {
            const alunos = AlunoModel.listarAlunos();

            if (!alunos || alunos.length === 0) {
                res.status(400).json({ msg: "Nenhum aluno cadastrado no banco!" });
                return;
            }

            res.status(200).json({ msg: "Alunos encontrados.", alunos });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao listar os alunos", erro: error.message });
        }
    }

    static buscarAlunoPorId(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                res.status(400).json({ msg: "Nenhum id fornecido" });
                return;
            }

            const aluno = AlunoModel.buscarAlunoId(id);

            if (!aluno) {
                res.status(404).json({ msg: "Aluno não encontrado!" });
                return;
            }

            res.status(200).json({ msg: "Aluno encontrado!", aluno });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao buscar aluno", erro: error.message });
        }
    }


    static buscarAlunoPorEmail(req, res) {
        try {
            const { email } = req.params;

            if (!email) {
                res.status(400).json({ msg: "Nenhum email fornecido" });
                return;
            }

            const aluno = AlunoModel.buscarAlunoEmail(email);

            if (!aluno) {
                res.status(404).json({ msg: "Aluno não encontrado com este email!" });
                return;
            }

            res.status(200).json({ msg: "Aluno encontrado!", aluno });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao buscar aluno por email", erro: error.message });
        }
    }

  
    static buscarAlunoPorMatricula(req, res) {
        try {
            const { matricula } = req.params;

            if (!matricula) {
                res.status(400).json({ msg: "Nenhuma matrícula fornecida" });
                return;
            }

            const aluno = AlunoModel.buscarAlunoMatricula(matricula);

            if (!aluno) {
                res.status(404).json({ msg: "Aluno não encontrado com esta matrícula!" });
                return;
            }

            res.status(200).json({ msg: "Aluno encontrado!", aluno });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao buscar aluno por matrícula", erro: error.message });
        }
    }

    static criarAluno(req, res) {
        try {
            const { matricula, nome, email, cursoId } = req.body;

            if (!matricula || !nome || !email || !cursoId) {
                res.status(400).json({ msg: "Todos os campos devem ser preenchidos!" });
                return;
            }

            // valida curso existente
            const curso = CursoModel.buscarCursoId(cursoId);
            if (!curso) {
                res.status(404).json({ msg: "Curso inexistente. Informe um curso válido." });
                return;
            }

            // valida email único
            const emailExiste = AlunoModel.buscarAlunoEmail(email);
            if (emailExiste) {
                res.status(400).json({ msg: "Email já cadastrado" });
                return;
            }

            // valida matrícula única
            const matriculaExiste = AlunoModel.buscarAlunoMatricula(matricula);
            if (matriculaExiste) {
                res.status(400).json({ msg: "Matrícula já cadastrada" });
                return;
            }

            const novoAluno = AlunoModel.criarAluno(matricula, nome, email, cursoId);

            res.status(201).json({ msg: "Aluno criado com sucesso!", novoAluno });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao cadastrar aluno", erro: error.message });
        }
    }

    static atualizarAluno(req, res) {
        try {
            const { id } = req.params;
            const { matricula, nome, email, cursoId } = req.body;

            if (!matricula || !nome || !email || !cursoId) {
                res.status(400).json({ msg: "Todos os campos devem ser preenchidos!" });
                return;
            }

            //valida se aluno existe
            const alunoExiste = AlunoModel.buscarAlunoId(id);
            if (!alunoExiste) {
                res.status(404).json({ msg: "Aluno inexistente" });
                return;
            }

            //valida curso existente
            const curso = CursoModel.buscarCursoId(cursoId);
            if (!curso) {
                res.status(404).json({ msg: "Curso inexistente. Informe um curso válido." });
                return;
            }

            //valida email único 
            const emailExiste = AlunoModel.buscarAlunoEmail(email);
            if (emailExiste && emailExiste.id !== parseInt(id)) {
                res.status(400).json({ msg: "Email já cadastrado" });
                return;
            }

            // valida matrícula única 
            const matriculaExiste = AlunoModel.buscarAlunoMatricula(matricula);
            if (matriculaExiste && matriculaExiste.id !== parseInt(id)) {
                res.status(400).json({ msg: "Matrícula já cadastrada" });
                return;
            }

            const alunoAtualizado = AlunoModel.atualizarAluno(id, matricula, nome, email, cursoId);

            if (!alunoAtualizado) {
                res.status(404).json({ msg: "Aluno inexistente" });
                return;
            }

            res.status(200).json({ msg: "Aluno atualizado com sucesso", alunoAtualizado });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao atualizar aluno", erro: error.message });
        }
    }

    static deletarAluno(req, res) {
        try {
            const { id } = req.params;

            const alunoDeletado = AlunoModel.deletarAluno(id);

            if (!alunoDeletado) {
                res.status(404).json({ msg: "Aluno não encontrado" });
                return;
            }

            res.status(200).json({ msg: "Aluno deletado com sucesso!" });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao deletar aluno.", erro: error.message });
        }
    }
}