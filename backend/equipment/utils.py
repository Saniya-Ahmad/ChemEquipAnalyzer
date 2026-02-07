import pandas as pd

def analyze_csv(file):
    df = pd.read_csv(file)

    # 🔹 Normalize column names
    df.columns = df.columns.str.strip().str.lower()

    required_columns = ["type", "flowrate", "pressure", "temperature"]

    if not all(col in df.columns for col in required_columns):
        raise ValueError("Ensure CSV has columns: Type, Flowrate, Pressure, Temperature")

    summary = {
        "total_count": len(df),
        "avg_flowrate": df["flowrate"].mean(),
        "avg_pressure": df["pressure"].mean(),
        "avg_temperature": df["temperature"].mean(),
        "type_distribution": df["type"].value_counts().to_dict(),
    }

    return summary
