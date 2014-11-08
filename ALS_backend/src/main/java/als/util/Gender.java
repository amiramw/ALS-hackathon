package als.util;

/**
 * @author I031820
 *
 */

public enum Gender {
	
	MALE((short)0), FEMALE((short)1);
	
	private short value;
	private String displayText;

    private Gender(short value) {
    	this.setValue(value);
    	String txt = "Male";
    	switch(value){
    		case 1: txt="Female";break;
    	}
    	
    	this.setDisplayText(txt);
    }
    
    private void setDisplayText(String displayText) {
		this.displayText = displayText;
	}
    
	public short getValue(){
    	return value;
    }
    
    private void setValue(short v){
    	value=v;
    }

	public boolean isMale(){
		return value == MALE.getValue();
	}
	
	public boolean isFemale(){
		return value == FEMALE.getValue();
	}

	public String getDisplayText() {
		return displayText;
	}

	public static Gender getGender(short value,Gender defValue){
		Gender res = getGender(value);
		if(res==null)res = defValue;
		return res;
	}
	
	public static Gender getGender(short value){
		switch(value){
			case 0: return MALE;
			case 1: return FEMALE;
		}
		
		return null;
	}
	
}
