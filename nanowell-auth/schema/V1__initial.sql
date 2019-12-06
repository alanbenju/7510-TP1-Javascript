
--- INSIGHTS

CREATE SEQUENCE public.insights_insight_id_seq
    INCREMENT 1
    START 70
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 10;

CREATE TABLE public.insights
(
    insight_id integer NOT NULL DEFAULT nextval('insights_insight_id_seq'::regclass),
    insight_type character varying(255) COLLATE pg_catalog."default" NOT NULL,
    text text COLLATE pg_catalog."default",
    CONSTRAINT insights_pkey PRIMARY KEY (insight_id, insight_type)
);

--- INSIGHTS_BRACKETS

CREATE SEQUENCE public.insight_brackets_id_seq
    INCREMENT 1
    START 50
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 10;

CREATE TABLE public.insight_brackets
(
    id integer NOT NULL DEFAULT nextval('insight_brackets_id_seq'::regclass),
    insight_id integer NOT NULL,
    insight_type character varying(255) COLLATE pg_catalog."default" NOT NULL,
    age_range int4range,
    weight_range numrange NOT NULL,
    sex character varying(1) COLLATE pg_catalog."default",
    CONSTRAINT insight_brackets_pkey PRIMARY KEY (id),
    CONSTRAINT insights_brackets_insights_pk FOREIGN KEY (insight_id, insight_type)
        REFERENCES public.insights (insight_id, insight_type) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);