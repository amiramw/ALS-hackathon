package als.util;

/**
 * @author I031820
 *
 */

public enum Sensor {
	
	WALK(0), PAINT(1), TALK(2);
	
	private int value;
	private String displayText;

    private Sensor(int value) {
    	this.setValue(value);
    	String txt = "Talking Sensor";//need to be trans????
    	switch(value){
    		case 0: txt="Walk Sensor";break;
    		case 1: txt="Paint Sensor";break;
    	}
    	
    	this.setDisplayText(txt);
    }
    
    private void setDisplayText(String displayText) {
		this.displayText = displayText;
	}
    
	public int getValue(){
    	return value;
    }
    
    private void setValue(int v){
    	value=v;
    }

	public boolean isTalkSenssor(){
		return value == TALK.getValue();
	}
	
	public boolean isPaintSensor(){
		return value == PAINT.getValue();
	}
	
	public boolean isWalkSensor(){
		return value == WALK.getValue();
	}

	public String getDisplayText() {
		return displayText;
	}

	public static Sensor getSensor(int value,Sensor defalut){
		switch(value){
			case 0: return WALK;
			case 1: return PAINT;
			case 2: return TALK;
		}
		return defalut;
	}

}
