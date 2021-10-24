const mongoose =  require('mongoose');
const SubjectSchema = new mongoose.Schema({
    vesselCode: {
        meta: mongoose.Mixed
    },
    vesselName: {
        meta: mongoose.Mixed
    },
    vesselLOA:{
         meta: mongoose.Mixed
    },
    arrivalVoyage:{
         meta: mongoose.Mixed
    },
    departureVoyage:{
         meta: mongoose.Mixed
    },
    operatorCode: {
         meta: mongoose.Mixed
    },
    service_Route: {
         meta: mongoose.Mixed
    },
    serviceName:{
         meta: mongoose.Mixed
    },
    remark:{ 
        meta: mongoose.Mixed
    },
    etb:{
         meta: mongoose.Mixed
    },
    ets:{
         meta: mongoose.Mixed
    },
    etc:{
         meta: mongoose.Mixed
    },
    etd:{
         meta: mongoose.Mixed
    },
    ata: {
         meta: mongoose.Mixed
    },
    atd:{
         meta: mongoose.Mixed
    },
    baseETB: {
         meta: mongoose.Mixed
    },
    baseETD:{
         meta: mongoose.Mixed
    },
    prePlannedLoadMoves:{
         meta: mongoose.Mixed
    },
    prePlannedDischargeMoves:{
         meta: mongoose.Mixed
    },
    prePlannedShiftingMoves:{
         meta: mongoose.Mixed
    },
    prePlannedCranes:{
         meta: mongoose.Mixed
    },
    prePlannedBollard:{
         meta: mongoose.Mixed
    },
    preIsStarboardBerth:{
         meta: mongoose.Mixed
    },
    preBerthingUpdateTime:{
         meta: mongoose.Mixed
    },
    plannedLoadMoves:{
         meta: mongoose.Mixed
    },
    plannedDischargeMoves:{
         meta: mongoose.Mixed
    },
    plannedShiftingMoves:{
         meta: mongoose.Mixed
    },
    plannedCranes:{
         meta: mongoose.Mixed
    },
    plannedBollard:{
         meta: mongoose.Mixed
    },
    isStarboardBerth:{
         meta: mongoose.Mixed
    },
    terminalCode:{
         meta: mongoose.Mixed
    },
    terminalCodeNext:{
         meta: mongoose.Mixed
    },
    terminalCodePrev:{
         meta: mongoose.Mixed
    },
    imoCode:{
         meta: mongoose.Mixed
    },
    callsign:{
         meta: mongoose.Mixed
    },
    latestRequiredCMPH:{
         meta: mongoose.Mixed
    },
    averageCranes:{
         meta: mongoose.Mixed
    },
    operationOrder:{
         meta: mongoose.Mixed
    },
    ci:{
         meta: mongoose.Mixed
    },
    proformaArrival:{
         meta: mongoose.Mixed
    },
    proformaDeparture:{
         meta: mongoose.Mixed
    }

},{
    timestamps: true,

});

module.exports = mongoose.model('Subject',SubjectSchema);