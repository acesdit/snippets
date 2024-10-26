package dev.lpa;

public class Songs {
    private String title;
    private double duration;

    public String getTitle() {
        return title;
    }

    public Songs(String title, double duration) {
        this.title = title;
        this.duration = duration;

    }

    @Override
    public String toString() {
        return "Songs{" +
                "title='" + title + '\'' +
                ", duration=" + duration +
                '}';
    }
}
