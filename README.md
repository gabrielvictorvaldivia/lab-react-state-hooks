# 🛒 Desafio — Mini-Ecommerce

> Uma jornada em duas fases para entender quando e por que migrar de `useState` para `useReducer`.

---

## Fase 1 — O Básico com `useState`

Crie um componente onde o usuário pode adicionar itens a uma lista.

### Estrutura do estado
```js
[{ id, nome, preco }]
```

### O que implementar
- Um botão **"Adicionar Camiseta (R$ 50)"** que insere o objeto no array

### Requisito obrigatório
Use sempre a **forma funcional** do setter:
```js
setCart(prev => [...prev, newItem])
```

---

## Fase 2 — A Complexidade com `useReducer`

As coisas ficaram sérias. O carrinho agora precisa de mais lógica e o `useState` começa a ficar bagunçado. **Migre toda a lógica para um `useReducer`.**

### Ações que o Reducer deve gerenciar

| Ação | Comportamento |
|------|---------------|
| `ADD_ITEM` | Adiciona um produto. Se já existir no carrinho, **aumenta apenas a quantidade** (não duplica a linha) |
| `REMOVE_ITEM` | Remove o item pelo ID |
| `UPDATE_QUANTITY` | Aumenta ou diminui a quantidade de um item específico |
| `CLEAR_CART` | Limpa todo o carrinho |

---

## Por que fazer essa migração?

| Característica | Com `useState` | Com `useReducer` |
|---|---|---|
| **Onde fica a lógica?** | Dentro das funções do componente | Fora do componente (na função reducer) |
| **Clareza** | Ótimo para valores simples (on/off) | Ótimo para estados que dependem de vários fatores |
| **Testabilidade** | Difícil de testar a lógica isolada | Fácil, pois o reducer é uma "função pura" (JS puro) |

---

## 📋 Script de Estudo — O que observar

### 1. Imutabilidade
No `useReducer`, garanta que você está **retornando um novo objeto de estado**, nunca alterando o `state` antigo diretamente.

### 2. Dispatch
Observe como o componente fica mais limpo, apenas disparando ações:
```js
dispatch({ type: 'ADD_ITEM', payload: produto })
```

### 3. Payload
O `payload` é o **"pacote de dados"** enviado junto com o tipo da ação — é por ele que o reducer sabe o que fazer.