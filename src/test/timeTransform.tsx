// atom
import { atom, selector } from "recoil";
import { useRecoilState } from "recoil";

//  atom ********************************************************
export const minuteState = atom({
    key: "minutes",
    default: 0,
});

export const hourSelector = selector({
    key: "hours",
    get: ({ get }) => {
        const minutes = get(minuteState);
        return minutes / 60;
    },
    // newValue = 사용자가 새로 입력하는 값
    set: ({ set }, newValue) => {
        // 시간을 분으로 변환
        const minutes = Number(newValue) * 60;
        // minuteState의 값을 minutes로 전환
        set(minuteState, minutes);
    }
})

// App ****************************************

const App = () => {
    const [minutes, setMinutes] = useRecoilState(minuteState);
    // get, set 함수 순서대로 받아옴
    const [hours, setHours] = useRecoilState(hourSelector);
    const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
        setMinutes(+event.currentTarget.value);
    };
    const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
        setHours(+event.currentTarget.value);
    };
    return (
        <>
            {/* 분 값 입력시 onMinutesChange 함수를 통해 hours 값이 변경됩니다. */}
            <input value={minutes} onChange={onMinutesChange} type="number" placeholder="minutes.." />
            {/* 시간 값 입력시 onHoursChange 함수를 통해 newValue로 값이 들어갑니다. */}
            <input value={hours} onChange={onHoursChange} type="number" placeholder="Hours" />
        </>
    );
};

export default App;