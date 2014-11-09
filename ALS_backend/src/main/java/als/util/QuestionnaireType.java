package als.util;

/**
 * @author I031820
 *
 */

public enum QuestionnaireType {
	FORM(0), SENSOR(1);
	
	private int value;
	private String displayText;

    private QuestionnaireType(int value) {
    	this.setValue(value);
    	String txt = "Form questionnaire";//need to be trans????
    	switch(value){
    		case 1: txt="Sesor questionnaire";break;
    	}
    	
    	this.setDisplayText(txt);
    }
    
    private void setDisplayText(String displayText) {
		this.displayText = displayText;
	}
    
	private int getValue(){
    	return value;
    }
    
    private void setValue(int v){
    	value=v;
    }

	public boolean isForm(){
		return value == FORM.getValue();
	}
	
	public boolean isSensor(){
		return value == SENSOR.getValue();
	}
	
	public String getDisplayText() {
		return displayText;
	}

	public static QuestionnaireType getType(int value,QuestionnaireType defalut){
		switch(value){
			case 0: return FORM;
			case 1: return SENSOR;
		}
		return defalut;
	}
}
