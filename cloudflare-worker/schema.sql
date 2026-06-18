CREATE TABLE IF NOT EXISTS submissions (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  name TEXT,
  industry TEXT,
  role TEXT,
  level TEXT NOT NULL,
  raw_score INTEGER,
  dimension_scores TEXT NOT NULL,
  evidence_json TEXT,
  bottleneck TEXT,
  next_breakthrough TEXT,
  collaboration_modes_json TEXT,
  answers_json TEXT NOT NULL,
  report_markdown TEXT NOT NULL,
  source_url TEXT,
  user_agent TEXT,
  ip_hash TEXT
);

CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_level ON submissions (level);
CREATE INDEX IF NOT EXISTS idx_submissions_industry ON submissions (industry);
