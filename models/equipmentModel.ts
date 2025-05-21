import { ResponsibleModel } from './responsibleModel';
import { LocationModel } from './locationModel';
import { EquipmentDetailsModel } from './equipmentDetailsModel';
import { MaintenanceCompanyModel } from './maintenanceCompanyModel';
import { UploadModel } from './uploadModel';

export interface EquipmentModel {
    id?: string;
    dataCriacao: Date;
    usuario: string;
    responsavel: ResponsibleModel;
    local: LocationModel;
    detalhes_equipamento: EquipmentDetailsModel;
    empresa_conservadora: MaintenanceCompanyModel;
    uploads: UploadModel[];
}
