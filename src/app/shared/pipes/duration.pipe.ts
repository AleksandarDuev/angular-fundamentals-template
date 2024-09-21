import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "duration",
})
export class DurationPipe implements PipeTransform {
    transform(value: number): string {
        if (value == null || value < 0) {
            return "Invalid duration";
        }

        const hours = Math.floor(value / 60);
        const minutes = value % 60;
        const formattedHours = hours.toString().padStart(2, "0");
        const formattedMinutes = minutes.toString().padStart(2, "0");

        // Singular or plural hour based on the hours value
        const hourLabel = hours === 1 ? "hour" : "hours";

        return `${formattedHours}:${formattedMinutes} ${hourLabel}`;
    }
}
