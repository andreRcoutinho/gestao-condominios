import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import * as paymentMapService from '../services/payment_map';
import * as paymentMapRules from '../rules/payment_map';
import { ApiResponse } from "../api/api_response";
import { INVALID_JSON_BODY } from "../api/api_errors";


const PAYMENT_MAP_INDEX_REQUEST: String = 'Todos os Mapas de Pagamento';
const PAYMENT_MAP_INDEX_SUCCESS: String = 'Todos os Mapas de Pagamento retornados com sucesso!';
const PAYMENT_MAP_INDEX_FAIL: String = 'Ocorreu um erro ao retornar todos os Mapas de Pagamento.';

const PAYMENT_MAP_SHOW_REQUEST: String = 'Mapa de Pagamento';
const PAYMENT_MAP_SHOW_SUCCESS: String = 'Mapa de Pagamento retornado com sucesso!';
const PAYMENT_MAP_SHOW_FAIL: String = 'Ocorreu um erro ao retornar o Mapa de Pagamento.';

const ANUAL_PAYMENT_MAP_SHOW_REQUEST: String = 'Mapa de Pagamento Anual';
const ANUAL_PAYMENT_MAP_SHOW_SUCCESS: String = 'Mapa de Pagamento Anual retornado com sucesso!';
const ANUAL_PAYMENT_MAP_SHOW_FAIL: String = 'Ocorreu um erro ao retornar o Mapa de Pagamento Anual.';

const PAYMENT_MAP_CREATE_REQUEST: String = 'Criar Mapa de Pagamento';
const PAYMENT_MAP_CREATE_SUCCESS: String = 'Mapa de Pagamento criado com sucesso!';
const PAYMENT_MAP_CREATE_FAIL: String = 'Ocorreu um erro ao criar o Mapa de Pagamento.';

const PAYMENT_MAP_SIMULATE_REQUEST: String = 'Simular Mapa de Pagamento';
const PAYMENT_MAP_SIMULATE_SUCCESS: String = 'Simualação de Mapa de Pagamento retornada com sucesso!';
const PAYMENT_MAP_SIMULATE_FAIL: String = 'Ocorreu um erro na simulação do Mapa de Pagamento.';

const PAYMENT_MAP_UPDATE_REQUEST: String = 'Alterar Mapa de Pagamento';
const PAYMENT_MAP_UPDATE_SUCCESS: String = 'Mapa de Pagamento alterado com sucesso!';
const PAYMENT_MAP_UPDATE_FAIL: String = 'Ocorreu um erro ao alterar o Mapa de Pagamento.';

const PAYMENT_MAP_REMOVE_REQUEST: String = 'Remover Mapa de Pagamento';
const PAYMENT_MAP_REMOVE_SUCCESS: String = 'Mapa de Pagamento removido com sucesso!';
const PAYMENT_MAP_REMOVE_FAIL: String = 'Ocorreu um erro ao remover o Mapa de Pagamento';

const CLOSE_PAYMENT_MAP_REQUEST: String = 'Fechar Mapa de Pagamento';
const CLOSE_PAYMENT_MAP_SUCCESS: String = 'Mapa de Pagamento fechado com sucesso!';
const CLOSE_PAYMENT_MAP_FAIL: String = 'Ocorreu um erro ao fechar o Mapa de Pagamento.';

export async function create(req: Request, res: Response) {
    if (!paymentMapRules.createRules(req.body)) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(PAYMENT_MAP_CREATE_REQUEST, PAYMENT_MAP_CREATE_FAIL, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY))
    }

    let response = await paymentMapService.create(req.body);
    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(PAYMENT_MAP_CREATE_REQUEST, PAYMENT_MAP_CREATE_FAIL, HttpStatus.BAD_REQUEST, {}, response.message))
    } else {
        return res.send(new ApiResponse(PAYMENT_MAP_CREATE_REQUEST, PAYMENT_MAP_CREATE_SUCCESS, HttpStatus.OK, response))
    }
}

export async function index(req: Request, res: Response) {
    let response = await paymentMapService.index((req.query.year) ? req.query.year.toString() : null);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(PAYMENT_MAP_INDEX_REQUEST, PAYMENT_MAP_INDEX_FAIL, HttpStatus.BAD_REQUEST, {}, response.message))
    } else {
        return res.send(new ApiResponse(PAYMENT_MAP_INDEX_REQUEST, PAYMENT_MAP_INDEX_SUCCESS, HttpStatus.OK, response))
    }

}

export async function show(req: Request, res: Response) {
    let response = await paymentMapService.show(Number(req.params.id));

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(PAYMENT_MAP_SHOW_REQUEST, PAYMENT_MAP_SHOW_FAIL, HttpStatus.BAD_REQUEST, {}, response.message))
    } else {
        return res.send(new ApiResponse(PAYMENT_MAP_SHOW_REQUEST, PAYMENT_MAP_SHOW_SUCCESS, HttpStatus.OK, response))
    }
}

export async function getAnualPaymentMap(req: Request, res: Response) {

    let response = await paymentMapService.getAnualPaymentMap((req.query.year) ? req.query.year.toString() : null);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(ANUAL_PAYMENT_MAP_SHOW_REQUEST, ANUAL_PAYMENT_MAP_SHOW_FAIL, HttpStatus.BAD_REQUEST, {}, response.message))
    } else {
        return res.send(new ApiResponse(ANUAL_PAYMENT_MAP_SHOW_REQUEST, ANUAL_PAYMENT_MAP_SHOW_SUCCESS, HttpStatus.OK, response))
    }
}

export async function update(req: Request, res: Response) {
    if (!paymentMapRules.updateRules(req.body)) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(PAYMENT_MAP_CREATE_REQUEST, PAYMENT_MAP_CREATE_FAIL, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY))
    }

    let response = await paymentMapService.update(Number(req.params.id), req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(PAYMENT_MAP_UPDATE_REQUEST, PAYMENT_MAP_UPDATE_FAIL, HttpStatus.BAD_REQUEST, {}, response.message))
    } else {
        return res.send(new ApiResponse(PAYMENT_MAP_UPDATE_REQUEST, PAYMENT_MAP_UPDATE_SUCCESS, HttpStatus.OK, response))
    }
}

export async function close(req: Request, res: Response) {
    let response = await paymentMapService.closePaymentMap(Number(req.params.id));

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(CLOSE_PAYMENT_MAP_REQUEST, CLOSE_PAYMENT_MAP_FAIL, HttpStatus.BAD_REQUEST, {}, response.message))
    } else {
        return res.send(new ApiResponse(CLOSE_PAYMENT_MAP_REQUEST, CLOSE_PAYMENT_MAP_SUCCESS, HttpStatus.OK, response))
    }
}

export async function simulate(req: Request, res: Response) {
    if (!paymentMapRules.createRules(req.body)) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(PAYMENT_MAP_SIMULATE_REQUEST, PAYMENT_MAP_SIMULATE_FAIL, HttpStatus.BAD_REQUEST, {}, INVALID_JSON_BODY))
    }

    let response = await paymentMapService.simulate(req.body);

    if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).send(new ApiResponse(PAYMENT_MAP_SIMULATE_REQUEST, PAYMENT_MAP_SIMULATE_FAIL, HttpStatus.BAD_REQUEST, {}, response.message))
    } else {
        return res.send(new ApiResponse(PAYMENT_MAP_SIMULATE_REQUEST, PAYMENT_MAP_SIMULATE_SUCCESS, HttpStatus.OK, response))
    }
}