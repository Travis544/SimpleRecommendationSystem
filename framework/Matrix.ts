// import { DataFrame } from "danfojs-node"

import { computeMeanWeightedRow, cosineSimilarity } from "./PredictionUtils"

export class Matrix {
    private dataFrame: Map<string, Map<string, number>>
    private columns: Array<string> = []
    constructor(index: Array<string>, columns: Array<string>, data: Map<string, Map<string, number>>) {
        this.dataFrame = data
        this.columns = columns
        // index.forEach((rowLabel, i) => {
        //     this.dataFrame.set(rowLabel, new Map())
        //     columns.forEach((column, j) => {
        //         this.dataFrame.get(rowLabel)?.set(column,)
        //     })
        // })
    }

    public getDataByRowAndColumn(row: string, column: string) {
        return this.dataFrame.get(row)?.get(column)
    }

    //data
    public filterRow(filterFunction: (rowName: string) => boolean): Matrix {
        const index: Array<string> = []
        const columns = this.columns
        const data: Map<string, Map<string, number>> = new Map()
        this.dataFrame.forEach((rowData, row) => {
            let res = filterFunction(row)
            if (res) {
                index.push(row)
                data.set(row, rowData)
            }
        })

        console.log(data)
        return new Matrix(index, columns, data)
    }

    //Maybe change specs to take in row vector of item's rating, and matrix of all other item's rating
    public weightedAverageCosineSimilarity(rowLabel: string, nMostSimilar: number) {
        if (!this.hasRow(rowLabel)) {
            throw new Error()

        }

        let selectedRowMap = this.dataFrame.get(rowLabel)
        let similarityScores: Map<string, number> = new Map()
        this.dataFrame.forEach((rowMap, row) => {
            if (row == rowLabel) {
                return
            }

            let selectedRowVector: Array<number> = []
            let rowVector: Array<number> = []
            //find commonality between the selected item's ratings and the other item's rating. I.E. ratings by the same user
            selectedRowMap?.forEach((rating, columnLabel) => {
                if (rowMap.has(columnLabel)) {
                    const userRatingForOtherItem = rowMap.get(columnLabel)!
                    selectedRowVector.push(rating)
                    rowVector.push(userRatingForOtherItem)
                }
            })

            let selectedMeanWeightedRow = computeMeanWeightedRow(selectedRowVector)
            let meanWeightedRow = computeMeanWeightedRow(rowVector)

            console.log("Computin cosine similarity...")
            console.log(rowLabel)
            console.log(row)
            console.log(rowVector)
            console.log(selectedRowVector)

            let similarityScore = cosineSimilarity(selectedMeanWeightedRow, meanWeightedRow)

            similarityScores.set(row, similarityScore)
        });
        return similarityScores
    }

    public hasRow(rowLabel: string) {
        if (!this.dataFrame.has(rowLabel)) {
            return false
        } else {
            return true
        }
    }

    public exist(row: string, column: string) {
        const hasRow = this.hasRow(row)
        if (hasRow) {
            if (this.dataFrame.get(row)!.has(column)) {
                return true
            }
        }
        return false
    }

}