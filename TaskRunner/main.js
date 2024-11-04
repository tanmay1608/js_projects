class TaskRunnner {
    constructor(concurrency) {
      this.queue = [];
      this.pendingQueue = [];
      this.concurrency = concurrency;
      this.actualLength = 0; 
     
     
    }
  
    push(task) {
      if (this.actualLength < this.concurrency) {
        this.queue.push(task);
        this.processExecution();
      } else {
        this.pendingQueue.push(task);
      }
    }
  
  
  
    async processExecution() {
      if (this.queue.length === 0) return;
  
      this.actualLength++;
  
      await this.queue.shift()();
      
      this.actualLength--;
     
        if (this.pendingQueue.length !== 0)
          this.queue.push(this.pendingQueue.shift());
      
  
      this.processExecution();
    }
  
    async execute() {
      await this.queue[this.currentIndex](); 
    }
  }
  
  const obj = new TaskRunnner(3);
  
  const t1 = async () => {
    console.log("t1 started");
    await delay(2000, "t1");
    console.log("t1 finished");
  };
  const t2 = async () => {
    console.log("t2 started");
    await delay(1000, "t2");
    console.log("t2 finished");
  };
  const t3 = async () => {
    console.log("t3 started");
    await delay(1500, "t3");
    console.log("t3 finished");
  };
  const t4 = async () => {
    console.log("t4 started");
    await delay(1000, "t4");
    console.log("t4 finished");
  };
  const t5 = async () => {
    console.log("t5 started");
    await delay(500, "t5");
    console.log("t5 finished");
  };
  
  const delay = (delay, val) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(val);
      }, delay);
    });
  };
  
  obj.push(t1);
  obj.push(t2);
  obj.push(t3);
  obj.push(t4);
  obj.push(t5);
  