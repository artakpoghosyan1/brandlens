import { IEffect } from '../models/IEffect'

export interface IState {
    currentEffects: IEffect[] | null
    selectedTimer: number
}
