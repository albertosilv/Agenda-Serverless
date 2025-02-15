import { IAgendamento } from "../../agendamento/interface/IAgendamento";
import { IMedico } from "../../agendamento/mock/medicoMock";
import { getAllAgendaDTO, IMedicoComHorarios } from "../dto/getAllAgendaDTO";

export function transformarDados(
  medicos: IMedico[],
  agendamentos: IAgendamento[]
): getAllAgendaDTO {
  const agenda: IMedicoComHorarios[] = medicos
    .map((medico) => {
      const horarios = agendamentos
        .filter((agendamento) => agendamento.medico_id === medico.id)
        .map((agendamento) => agendamento.data_horario);

      return {
        id: medico.id,
        nome: medico.nome,
        especialidade: medico.cargo,
        horarios_disponiveis: horarios,
      };
    })
    .filter((medico) => medico.horarios_disponiveis.length > 0);

  return { medicos: agenda };
}
