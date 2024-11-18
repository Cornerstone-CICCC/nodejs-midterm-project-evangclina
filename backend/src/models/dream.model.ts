import { v4 as uuidv4 } from "uuid"
import { Dream } from "../types/dream"

class DreamModel {
    private dreams: Dream[] = []

    getAll(userId: string){
        const dreams = this.dreams.filter(dream => dream.userId === userId)
        return dreams
    }

    findById(id: string): Dream | undefined {
        const dream = this.dreams.find(d => d.id === id)
        if(!dream) return undefined
        return dream
    }

    create(data: Omit<Dream, "id">){
        const newDream = {
            id: uuidv4(),
            ...data
        }
        this.dreams.push(newDream)
        return newDream
    }
    edit(id: string, newData: Partial<Dream>): Dream | undefined {
        const index = this.dreams.findIndex(d => d.id === id)
        if(index === -1) return undefined

        if(this.dreams[index].userId !== newData.userId) return undefined

        const updatedDream = {
            ...this.dreams[index], 
            ...newData
        }
        this.dreams[index] = updatedDream
        return updatedDream
    }

    delete(id: string, userId: string): boolean{
        const index = this.dreams.findIndex(d => d.id === id && d.userId === userId)
        if(index === -1) return false
        this.dreams.splice(index, 1)
        return true
    }
}

export default new DreamModel