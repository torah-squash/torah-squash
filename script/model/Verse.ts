class Verse{
    private str : string;
    private words : string[];
    private flags : boolean[];

    constructor(str : string){
        this.str = str;
        this.split();
        this.initialFlags();
    }

    private split() : void {
        this.words = [];
        var word : string = "";
        for(var i = 0 ; i < this.str.length ; i++){
            if(this.str[i] == ' '){
                this.words.push(word);
            }
            else if(this.str[i] == '\n' || this.str[i] == '-'){
            }
            else{
                word.concat(this.str[i]);
            }
        }
    }

    private initialFlags() : void{
        this.flags = [];
        for(var i = 0 ; i < this.str.length ; i++){
            if(this.str[i] == ' ' || this.str[i] == '\n' || this.str[i] == '-'){
                this.flags.push(true);
            }
            else{
                this.flags.push(false);
            }
        }
    }

    public getStr() : string{
        return this.str;
    }
    public getWords() : string[] {
        return this.words;
    }
    public getFlags() : boolean[] {
        return this.flags;
    }
    public getFlag(index : number) : boolean{
        return this.flags[index];
    }
    public getWord(index : number) : string {
        return this.words[index];
    }
    public getLetter(index : number) : string{
        return this.str[index];
    }
    public setFlag(index: number, check : boolean) : void {
        this.flags[index] = check;
    }
    public getShownVerse() : string {
        var show : string = this.str;
        for(var i = 0 ; i < show.length ; i++){
            if(this.getFlag(i) == false){
                show[i] = '_';
            }
        }
        return show;
    }
    public getPlainLetters() : string[] {
        var letters : string[] = [];
        for(var i = 0 ; i < this.str.length ; i++){
            if(this.str[i] != ' ' && this.str[i] != '-' && this.str[i] != '\n'){
                letters.push(this.str[i]);
            }
        }
        return letters;
    }
}