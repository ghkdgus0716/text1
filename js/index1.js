

function generateEntry() {

numberOfLines = Math.floor(Math.random() * 10)+1   
             

entry = ''
                           
for (i = 0; i < numberOfLines; i++) {    
                         
  
entryRef = Math.floor(Math.random() * tt.length)

    entryText = (tt[entryRef])

    entry = entry + entryText + " "
  
  
}
 
}

generateEntry()