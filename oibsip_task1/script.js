class Calculator{
    constructor(previousoperandtextelement, currentoperandtextelement) {
      this.previousoperandtextelement = previousoperandtextelement
      this.currentoperandtextelement = currentoperandtextelement
      this.clear()
    }
  
    clear() {
        this.currentoperand = ''
        this.previousoperand = ''
        this.operation = undefined
    }
  
    delete() {
        this.currentoperand=this.currentoperand.toString().slice(0,-1)
        this.operation=undefined
        this.previousoperand=''
    }
  
    appendNumber(number) {
        if(number==='.' && this.currentoperand.includes('.')) return
        this.currentoperand=this.currentoperand.toString()+number.toString()
    
    }
  
    chooseOperation(operation) {
        if(this.currentoperand==='') return
        if(this.previousoperand!==''){
            this.compute()
        }
        this.operation=operation
        this.previousoperand=this.currentoperand
        this.currentoperand=''
      
    }
  
    compute() {
        let computation
        const prev=parseFloat(this.previousoperand)
        const current=parseFloat(this.currentoperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation=prev+current
                break
            case '-':
                computation=prev-current
                break
            case '*':
                computation=prev*current
                break
            case '÷':
                computation=prev/current
                break
            default:
                return
        }
      this.currentoperand=computation
      this.previousoperand=''
      this.operation=undefined
    }

    getdisplaynumber(number){
        const stringnumber=number.toString()
        const integerdigits=parseFloat(stringnumber.split('.'))
        const decimaldigits=stringnumber.split('.')[1]
        let integerdisplay
        if(isNaN(integerdigits)){
            integerdisplay=''
        }
        else{
            integerdisplay=integerdigits.toLocaleString('en',{
                maximumFractionDigits:0})
        }
        if(decimaldigits!=null){
            return `${integerdisplay}.${decimaldigits}`
        }
        else{
            return integerdisplay 
        }
    }
  
    updateDisplay() {
        this.currentoperandtextelement.innerText = this.getdisplaynumber(this.currentoperand)
        if(this.operation!=null){
            this.previousoperandtextelement.innerText=`${this.getdisplaynumber(this.previousoperand)} ${this.operation}`

        }
        else{
            this.previousoperandtextelement.innerText=''
        }
        
     
    }
}
  
  
const numberbuttons = document.querySelectorAll('[data-number]')
const operationbuttons = document.querySelectorAll('[data-operation]')
const equalsbutton = document.querySelector('[data-equals]')
const deletebutton = document.querySelector('[data-delete]')
const acbutton = document.querySelector('[data-ac]')
const previousoperandtextelement = document.querySelector('[data-previous-operand]')
const currentoperandtextelement = document.querySelector('[data-current-operand]')
  
const calculator = new Calculator(previousoperandtextelement, currentoperandtextelement)
  
numberbuttons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationbuttons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsbutton.addEventListener('click',button =>{
    calculator.compute()
    calculator.updateDisplay()
})

acbutton.addEventListener('click',button =>{
    calculator.clear()
    calculator.updateDisplay()
})

deletebutton.addEventListener('click',button =>{
    calculator.delete()
    calculator.updateDisplay()
})