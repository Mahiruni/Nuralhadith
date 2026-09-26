export type AudioLicenseStatus="verified-redistribution"|"verified-streaming"|"permission-required"|"unknown";
export type LicensedAudioRecord={id:string;collection:string;hadithNumber:string;language:"ar"|"en"|"am"|"ti"|"om";url:string;reciter:string;rightsHolder:string;license:string;licenseUrl:string;permissionReference?:string;permittedUses:string[];attribution:string;verifiedAt:string;sha256?:string;status:AudioLicenseStatus};
export const LICENSED_AUDIO:LicensedAudioRecord[]=[];
export function licensedAudio(id:string){return LICENSED_AUDIO.find(x=>x.id===id)||null}
