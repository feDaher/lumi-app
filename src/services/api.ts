import axios from 'axios';

export const api=axios.create({
    baseURL: 'http://192.168.0.8:3333',
});


export async function sigUp(name: string, cpf: string, email: string, password: string) {
    const response = await api.post('app/public/cadastrar', {
        name,
        cpf,
        email,
        password,    
    });
    return response.data
};